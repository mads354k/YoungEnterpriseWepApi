using System;
using System.Collections.Generic;

namespace YoungEnterpriseWepApi.Models
{
    public partial class Question
    {
        public Question()
        {
            QuestionInformation = new HashSet<QuestionInformation>();
        }

        public int QuestionId { get; set; }
        public string TextDescription { get; set; }
        public string Track { get; set; }
        public double? WeightValue { get; set; }

        public ICollection<QuestionInformation> QuestionInformation { get; set; }
    }
}
