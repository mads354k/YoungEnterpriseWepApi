using System;
using System.Collections.Generic;

namespace YoungEnterpriseWepApi.Models
{
    public partial class TimeShedule
    {
        public int SheduleId { get; set; }
        public string JudgeTeam { get; set; }
        public string TeamName { get; set; }
        public string EventTime { get; set; }

        public Team TeamNameNavigation { get; set; }
    }
}
