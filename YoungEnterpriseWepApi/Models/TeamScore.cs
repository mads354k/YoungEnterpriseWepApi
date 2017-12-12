using System;
using System.Collections.Generic;

namespace YoungEnterpriseWepApi.Models
{
    public partial class TeamScore
    {
        public int ScoreId { get; set; }
        public string TeamName { get; set; }
        public int? QuestionnarieId { get; set; }
        public bool? ForReport { get; set; }

        public Questionnarie Questionnarie { get; set; }
        public Team TeamNameNavigation { get; set; }
    }
}
