import countries from '../assets/all_countries_20230324.json'

type countryList = {
  name: string
  region: string
  flag: string
}

export const countryList: countryList[] = []

const getCountryList = () => {
  countries.forEach((c) => {
    countryList.push({
      name: c.name.common,
      region: c.region,
      flag: c.flags.png,
    })
  })
}
getCountryList()

export const regionsList: string[] = []

const getRegionsList = () => {
  countries.forEach((c) => {
    if (!regionsList.includes(c.region)) regionsList.push(c.region)
  })
}
getRegionsList()
