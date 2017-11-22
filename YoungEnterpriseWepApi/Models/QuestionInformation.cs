using System;
using System.Collections.Generic;

namespace YoungEnterpriseWepApi.Models
{
    public partial class QuestionInformation
    {
        public int InfoId { get; set; }
        public int? QuestionnarieId { get; set; }
        public int? QuestionId { get; set; }

        public Question Question { get; set; }
        public Questionnarie Questionnarie { get; set; }
    }
}
