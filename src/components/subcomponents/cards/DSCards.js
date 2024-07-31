const DSCards  = (props) => {
  return(
  <div className="flex flex-wrap mb-2">
      <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
        <a href="http://localhost:3000/booking">
          <div className="bg-green-600 border rounded shadow p-2">
              <div className="flex flex-row items-center">
                  <div className="flex-shrink pl-1 pr-4"><i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                  <div className="flex-1 text-right">
                      <h5 className="text-white">Total Bookings</h5>
                      <h3 className="text-white text-3xl">{props.bookingsCount || 0} Bookings<span className="text-green-400"><i className="fas fa-caret-down"></i></span></h3>
                  </div>
              </div>
          </div>
        </a>
      </div>
      <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
          <a href="http://localhost:3000/allusers">
            <div className="bg-blue-600 border rounded shadow p-2">
                <div className="flex flex-row items-center">
                    <div className="flex-shrink pl-1 pr-4"><i className="fas fa-users fa-2x fa-fw fa-inverse"></i></div>
                    <div className="flex-1 text-right">
                        <h5 className="text-white">Total Users</h5>
                        <h3 className="text-white text-3xl">{props.usersCount || 0} Users<span className="text-blue-400"><i className="fas fa-caret-up"></i></span></h3>
                    </div>
                </div>
            </div>
            </a>
      </div>
      <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
        <div className="bg-orange-600 border rounded shadow p-2">
              <div className="flex flex-row items-center">
                  <div className="flex-shrink pl-1 pr-4"><i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i></div>
                  <div className="flex-1 text-right pr-1">
                      <h5 className="text-white">Total Service Providers</h5>
                      <h3 className="text-white text-3xl">{props.providersCount || 0} Providers<span className="text-orange-400"><i className="fas fa-caret-up"></i></span></h3>
                  </div>
              </div>
          </div>
      </div>
      <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-3 xl:pr-2">
          <div className="bg-purple-600 border rounded shadow p-2">
              <div className="flex flex-row items-center">
                  <div className="flex-shrink pl-1 pr-4"><i className="fas fa-server fa-2x fa-fw fa-inverse"></i></div>
                  <div className="flex-1 text-right">
                      <h5 className="text-white">Pending Bookings</h5>
                      <h3 className="text-white text-3xl">{props.pendingBookCount || 0} Pending</h3>
                  </div>
              </div>
          </div>
      </div>
      <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pl-2 xl:pr-3">
          <div className="bg-red-600 border rounded shadow p-2">
              <div className="flex flex-row items-center">
                  <div className="flex-shrink pl-1 pr-4"><i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i></div>
                  <div className="flex-1 text-right">
                      <h5 className="text-white">Total Services</h5>
                      <h3 className="text-white text-3xl">{props.servicesCount || 0} Services</h3>
                  </div>
              </div>
          </div>
      </div>
      <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
          <div className="bg-pink-600 border rounded shadow p-2">
              <div className="flex flex-row items-center">
                  <div className="flex-shrink pl-1 pr-4"><i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i></div>
                  <div className="flex-1 text-right">
                      <h5 className="text-white"> Total Sub Services</h5>
                      <h3 className="text-white text-3xl">{props.subServiceCount || 0} <span className="text-pink-400"><i className="fas fa-caret-up"></i></span></h3>
                  </div>
              </div>
          </div>
      </div>
  </div>)
}

export default DSCards