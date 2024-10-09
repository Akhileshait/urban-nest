import './filter.scss'

function Filter(){
  return (
    <div className='filter'>
      <h1>Search results from <b>London</b></h1>
      <div className="top">

        <div className="item">
          <label htmlFor="city">Location</label>
          <input type="text" id="city" name='city' placeholder='City Location'/>
        </div>
      </div>

      <div className="bottom">
      <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
          <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
          
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="propert" id="property">
          <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minProce">Min Price</label>
          <input type="number" id="minPrice" name='minPrice' placeholder='any'/>
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Location</label>
          <input type="number" id="maxPrice" name='maxPrice' placeholder='any'/>
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input type="text" id="bedroom" name='bedroom' placeholder='City Location'/>
        </div>
      </div>
    </div>
  )
}

export default Filter