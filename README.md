Quarries - 

CompanyRoutes.get('/:id',isAuthenticated,AccessRole(['company','admin']),getCompanyById); - remove this isAuthenticated,AccessRole(['company','admin'])

in api calls need to use baseurl as import meta env not the direct link and there mention the main url like baseUrl: `${import.meta.env}/company`, the company is the main routes