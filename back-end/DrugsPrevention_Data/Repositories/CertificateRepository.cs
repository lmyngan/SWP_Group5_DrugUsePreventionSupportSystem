using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.Repositories.Irepositories;
using Microsoft.EntityFrameworkCore;

namespace DrugsPrevention_Data.Repositories
{
    public class CertificateRepository : ICertificateRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public CertificateRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<List<Certificate>> GetAllAsync()
        {
            return await _context.Certificates.ToListAsync();
        }

        public async Task<Certificate> GetByIdAsync(int id)
        {
            return await _context.Certificates.FindAsync(id);
        }

        public async Task<Certificate> AddAsync(Certificate certificate)
        {
            _context.Certificates.Add(certificate);
            await _context.SaveChangesAsync();
            return certificate;
        }

        public async Task<bool> UpdateAsync(Certificate certificate)
        {
            _context.Certificates.Update(certificate);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var cert = await _context.Certificates.FindAsync(id);
            if (cert == null) return false;
            _context.Certificates.Remove(cert);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
