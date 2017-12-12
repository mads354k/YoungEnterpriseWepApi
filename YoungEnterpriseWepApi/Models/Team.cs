using System;
using System.Collections.Generic;

namespace YoungEnterpriseWepApi.Models
{
    public partial class Team
    {
        public Team()
        {
            Person = new HashSet<Person>();
            Questionnarie = new HashSet<Questionnarie>();
            TeamScore = new HashSet<TeamScore>();
            TimeShedule = new HashSet<TimeShedule>();
        }

        public string TeamName { get; set; }
        public string Track { get; set; }
        public string School { get; set; }
        public bool? Participant { get; set; }

        public ICollection<Person> Person { get; set; }
        public ICollection<Questionnarie> Questionnarie { get; set; }
        public ICollection<TeamScore> TeamScore { get; set; }
        public ICollection<TimeShedule> TimeShedule { get; set; }
    }
}
