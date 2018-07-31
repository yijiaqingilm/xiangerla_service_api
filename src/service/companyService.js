import * as Model from '../store/AuthorModel'

const companyService = {}
companyService.getCompany = (where) => Model.Company.findOne({where})
companyService.setCompany = (company) => {
  let {companyId, ...other} = company
  return Model.Company.update(other, {where: {companyId}})
}
companyService.addCompany = (company) => Model.Company.create(company)
export default companyService
