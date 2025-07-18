﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace DrugsPrevention.Utilities
{
    public class VNPayHelper
    {
        private readonly IConfiguration _configuration;

        public VNPayHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string CreatePaymentUrl(string orderId, decimal amount, string ipAddress)
        {
            var vnpayConfig = _configuration.GetSection("VNPay");
            string vnp_TmnCode = vnpayConfig["TmnCode"];
            string vnp_HashSecret = vnpayConfig["HashSecret"];
            string vnp_Url = vnpayConfig["PaymentUrl"];
            string vnp_Returnurl = vnpayConfig["ReturnUrl"];

            if (string.IsNullOrEmpty(ipAddress) || ipAddress == "::1")
            {
                ipAddress = "127.0.0.1";
            }

            var gmtPlus7 = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
            var createDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, gmtPlus7);

            var vnp_Params = new SortedDictionary<string, string>
            {
                { "vnp_Version", "2.1.0" },
                { "vnp_Command", "pay" },
                { "vnp_TmnCode", vnp_TmnCode },
                { "vnp_Amount", ((long)(amount * 100)).ToString() },
                { "vnp_CreateDate", createDate.ToString("yyyyMMddHHmmss") },
                { "vnp_CurrCode", "VND" },
                { "vnp_IpAddr", ipAddress },
                { "vnp_Locale", "vn" },
                { "vnp_OrderInfo", $"ThanhToanDonHang{orderId}" },
                { "vnp_OrderType", "250000" },
                { "vnp_ReturnUrl", vnp_Returnurl },
                { "vnp_TxnRef", orderId }
            };

            string signData = string.Join("&", vnp_Params.Select(kvp => $"{kvp.Key}={Uri.EscapeDataString(kvp.Value)}"));
            string vnp_SecureHash = HmacSHA512(vnp_HashSecret, signData);
            vnp_Params["vnp_SecureHash"] = vnp_SecureHash;

            var paymentUrl = vnp_Url + "?" + string.Join("&", vnp_Params.Select(kvp => $"{kvp.Key}={Uri.EscapeDataString(kvp.Value)}"));
            return paymentUrl;
        }

        public bool VerifyCallback(Dictionary<string, string> vnpayData)
        {
            var vnpayConfig = _configuration.GetSection("VNPay");
            string vnp_HashSecret = vnpayConfig["HashSecret"];

            if (!vnpayData.ContainsKey("vnp_SecureHash"))
            {
                return false;
            }

            string vnp_SecureHash = vnpayData["vnp_SecureHash"];
            vnpayData.Remove("vnp_SecureHash");

            var sortedParams = new SortedDictionary<string, string>(vnpayData);
            string signData = string.Join("&", sortedParams.Select(kvp => $"{kvp.Key}={Uri.EscapeDataString(kvp.Value)}"));
            string checkSum = HmacSHA512(vnp_HashSecret, signData);

            return checkSum.Equals(vnp_SecureHash, StringComparison.InvariantCultureIgnoreCase);
        }

        private string HmacSHA512(string key, string inputData)
        {
            using (var hmac = new HMACSHA512(Encoding.UTF8.GetBytes(key)))
            {
                var hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(inputData));
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }
    }
}
