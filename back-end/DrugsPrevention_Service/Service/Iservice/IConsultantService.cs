﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.DTO.Consultant;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface IConsultantService
    {
        Task<ConsultantResponseDTO> GetConsultantByIdAsync(int consultantId);
    }
}

