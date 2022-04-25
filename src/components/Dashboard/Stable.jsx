import React from 'react'
import Navbar from './Sidebar'

function Stable() {
  return (

<React.Fragment>

<Navbar>

</Navbar>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-9 col-xl-7">
          <div class="card">
            <div class="card-body p-4 p-md-5">
              <h3 class="mb-4 pb-2">Create new Stable</h3>
              <form action="">

                <div class="row">
                  <div class="col-md-6 mb-4">

                    <div class="form-outline">
                      <input type="text" id="firstName" class="form-control" />
                      <label class="form-label" for="firstName">Stable Name</label>
                    </div>

                  </div>
                 <div class="col-md-6 mb-4">

                    <div class="form-outline">
                      <input
                        type="number"
                        class="form-control"
                        id="LandscapeS"
                      />
                      <label for="LandscapeS" class="form-label">Landscape Size</label>
                    </div>

                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-4">

                    <div class="form-outline">
                      <input
                        type="number"
                        class="form-control"
                        id="Numberofrooms"
                      />
                      <label for="Numberofrooms" class="form-label">Rooms Number</label>
                    </div>

                  </div>
                 <div class="col-md-6 mb-4">

                    <div class="form-outline">
                      <input
                        type="number"
                        class="form-control"
                        id="Sizeofrooms"
                      />
                      <label for="Sizeofrooms" class="form-label">Room Size</label>
                    </div>

                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-4">

                    <div class="form-outline">
                      <input type="text" id="Placeholder" class="form-control" />
                      <label class="form-label" for="Placeholder">Placeholder</label>
                    </div>

                  </div>
                  <div class="col-md-6 mb-4">

                    <div class="form-outline">
                      <input type="text" id="Placeholder2" class="form-control" />
                      <label class="form-label" for="Placeholder2">Phone Number</label>
                    </div>

                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <div class="mt-4">
                      <input class="btn btn-primary btn-lg" type="submit" value="Submit" />
                    </div>

                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </React.Fragment>
  )
}

export default Stable
