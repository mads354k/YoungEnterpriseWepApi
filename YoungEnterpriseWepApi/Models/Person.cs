using System;
using System.Collections.Generic;

namespace YoungEnterpriseWepApi.Models
{
    public partial class Person
    {
        public Person()
        {
            Account = new HashSet<Account>();
        }

        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mail { get; set; }
        public string EventStatus { get; set; }
        public string TeamName { get; set; }

        public Team TeamNameNavigation { get; set; }
        public ICollection<Account> Account { get; set; }
    }
}
