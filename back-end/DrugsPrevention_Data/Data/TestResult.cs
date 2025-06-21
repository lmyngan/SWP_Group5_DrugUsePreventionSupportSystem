using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    public class TestResult
    {
        [Key]
        [Column("result_id")]
        public int ResultId { get; set; }
        [Column("account_id")]
        public int AccountId { get; set; }
        [Column("test_id")]
        public int TestId { get; set; }
        [Column("risk_level")]
        public string RiskLevel { get; set; }
        [Column("recommended")]
        public string Recommended { get; set; }
        [Column("assessed_at")]
        public DateTime AssessedAt { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Accounts Account { get; set; }
        [ForeignKey(nameof(TestId))]
        public Test Test { get; set; }
        public ICollection<TestAnswer> Answers { get; set; }
    }
}
