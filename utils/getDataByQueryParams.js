export const getDataByQueryParams = (data, queryObj) => {
            const {continent, country, is_open_to_public} = queryObj

            let datas = [...data]

        if(continent) {
            datas = datas.filter(desObj => 
                desObj.continent.toLowerCase() === continent.toLowerCase()
            )
        }

        if(country) {
            datas = datas.filter(desObj => 
                desObj.country.toLowerCase() === country.toLowerCase()
            )
        }

        if(is_open_to_public) {

            datas = datas.filter(desObj => 
                desObj.is_open_to_public === JSON.parse(is_open_to_public.toLowerCase())
            )
        }
        return datas
}