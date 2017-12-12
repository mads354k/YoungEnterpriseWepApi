using System;
using System.Collections.Generic;

namespace YoungEnterpriseWepApi.Models
{
    public partial class Questionnarie
    {
        public Questionnarie()
        {
            QuestionInformation = new HashSet<QuestionInformation>();
            TeamScore = new HashSet<TeamScore>();
        }

        public int QuestionnarieId { get; set; }
        public double? Valuation { get; set; }
        public string TeamName { get; set; }

        public Team TeamNameNavigation { get; set; }
        public ICollection<QuestionInformation> QuestionInformation { get; set; }
        public ICollection<TeamScore> TeamScore { get; set; }
    }
}
