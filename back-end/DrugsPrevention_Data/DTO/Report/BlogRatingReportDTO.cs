using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Report
{
    public class BlogRatingReportDTO
    {
        public int FiveStarCount { get; set; }
        public int FourStarCount { get; set; }
        public int ThreeStarCount { get; set; }
        public int TwoStarCount { get; set; }
        public int OneStarCount { get; set; }
        public int ZeroStarCount { get; set; }
        public int TotalBlogs { get; set; }
        public double AverageRating { get; set; }
    }
} 