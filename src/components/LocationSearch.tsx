import axios from 'axios';
import React, { useState } from 'react';
import { Search, SearchProps, SearchResultData } from 'semantic-ui-react';

 interface Props{
  onSelect: Function,
 }

const LocationSearch: React.FC<Props> = ({onSelect}) => {
  const [state, setState] = useState<{results: Array<Object>, isLoading: boolean, focus: boolean}>({
    results: [],
    isLoading: false,
    focus: false
  });

  const [search, setSearch] = useState<string | undefined>(undefined)

  let timeoutId: NodeJS.Timeout;

  const handleSearchChange = (event: React.MouseEvent<HTMLElement>, data: SearchProps) => {
    setState({
      ...state,
      isLoading: true
    });
    setSearch(data.value)
    // Stop the previous setTimeout if there is one in progress
    clearTimeout(timeoutId)

    // Launch a new request in 1000ms
    timeoutId = setTimeout(() => {
      performSearch()
    }, 1000)
  }

  const performSearch = () => {
    if (search === undefined) {
      setState({
        ...state,
        results: [],
        isLoading: false
      })
      return;
    }
    
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&cachebuster=1623166568366&autocomplete=true&country=fr%2Cmq%2Cmf%2Cyt%2Cpf&language=fr`)
      .then((response) => {
        setState({
          ...state,
          results: response.data.features.map((place: {place_name_fr: string, id: number, geometry: {coordinates: Array<number>}}) => {
            return {
              title: place.place_name_fr,
              id: place.id,
              coordinates: place.geometry.coordinates,
              city: place.place_name_fr
          }}),
          isLoading: false
        })
      })
  }

  const handleItemSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: SearchResultData) => {
    setState({
      ...state,
      results: []
    })
    setSearch("")
    onSelect(data.result)
  }

  return (
    <div className="searchs container">
      <Search
        loading={state.isLoading}
        placeholder='Recherche dans JAMap'
        onResultSelect={handleItemSelect}
        onSearchChange={handleSearchChange}
        results={state.results}
        value={search}
        size="large"
      />
    </div>
  )
}

export default LocationSearch;
