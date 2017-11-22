using System;
using System.Collections.Generic;

namespace YoungEnterpriseWepApi.Models
{
    public partial class Account
    {
        public int AccountId { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public int? PersonId { get; set; }

        public Person Person { get; set; }
    }
}
