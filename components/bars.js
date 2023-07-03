class Bars extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <!-- Preloader -->
        <div class="preloader flex-column justify-content-center align-items-center">
          <img class="animation__shake" src="/dist/img/emr_monitor.png" alt="EMR MONITOR" height="60" width="60">
        </div>
      
        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
          <!-- Left navbar links -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <a href="/index.html" class="nav-link">Home</a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <a href="#" onclick="logout()" class="nav-link">Logout</a>
            </li>
          </ul>
      
          <!-- Right navbar links -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#" role="button">
                <i class="fas fa-broadcast-tower" id="vpn_status"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" role="button">
                <i class="fas fa-cloud" id="internet_status"></i>
              </a>
            </li>
            <!-- Navbar Search -->
            <li class="nav-item">
              <a class="nav-link" data-widget="navbar-search" href="#" role="button">
                <i class="fas fa-search"></i>
              </a>
              <div class="navbar-search-block">
                <form class="form-inline">
                  <div class="input-group input-group-sm">
                    <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                    <div class="input-group-append">
                      <button class="btn btn-navbar" type="submit">
                        <i class="fas fa-search"></i>
                      </button>
                      <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            <li class="nav-item">
              <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                <i class="fas fa-expand-arrows-alt"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                <i class="fas fa-th-large"></i>
              </a>
            </li>
          </ul>
        </nav>
        <!-- /.navbar -->
      
        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
          <!-- Brand Logo -->
          <a href="/index.html" class="brand-link">
            <img src="/dist/img/emr_monitor.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-light">EMR MONITOR</span>
          </a>
      
          <!-- Sidebar -->
          <div class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
              <div class="image">
                <img src="/dist/img/avatar.svg" class="img-circle elevation-2" alt="User Image">
              </div>
              <div class="info">
                <a href="#" class="d-block">${sessionStorage.getItem('name')}</a>
              </div>
            </div>
      
            <!-- SidebarSearch Form -->
            <div class="form-inline">
              <div class="input-group" data-widget="sidebar-search">
                <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
                <div class="input-group-append">
                  <button class="btn btn-sidebar">
                    <i class="fas fa-search fa-fw"></i>
                  </button>
                </div>
              </div>
            </div>
      
            <!-- Sidebar Menu -->
            <nav class="mt-2">
              <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <!-- Add icons to the links using the .nav-icon class
                     with font-awesome or any other icon font library -->
                <li class="nav-item" id="dashboard">
                  <a href="#" class="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                      Dashboard
                      <i class="fas fa-angle-left right"></i>
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="/index.html" class="nav-link" id="dashboard_v1">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Dashboard v1</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="/index2.html" class="nav-link" id="dashboard_v2">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Dashboard v2</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item" id="general">
                  <a href="#" class="nav-link" id="dashboard_v1">
                    <i class="nav-icon fas fa-edit"></i>
                    <p>
                      General
                      <i class="fas fa-angle-left right"></i>
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="/pages/manage_facilities.html" class="nav-link" id="manage_facilities">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Manage Facilities</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="/pages/manage_districts.html" class="nav-link" id="manage_districts">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Manage Districts</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="/pages/manage_users.html" class="nav-link" id="manage_users">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Manage Users</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="/pages/manage_zones.html" class="nav-link" id="manage_zones">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Manage Zones</p>
                      </a>
                    </li>
                   
                  </ul>
                </li>
                <li class="nav-item" id="databases">
                  <a href="#" class="nav-link">
                    <i class="nav-icon fas fa-database"></i>
                    <p>
                      Dumps
                      <i class="fas fa-angle-left right"></i>
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="/pages/manage_databases.html" class="nav-link" id="view_databases">
                        <i class="far fa-circle nav-icon"></i>
                        <p>View Dumps</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item" id="maps">
                  <a href="#" class="nav-link">
                    <i class="nav-icon fas fa-map-marked-alt"></i>
                    <p>
                      Maps
                      <i class="fas fa-angle-left right"></i>
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="/pages/map.html" class="nav-link" id="view_map">
                        <i class="far fa-circle nav-icon"></i>
                        <p>View Map</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item" id="reports">
                  <a href="#" class="nav-link">
                    <i class="nav-icon fas fa-file-alt"></i>
                    <p>
                      Reports
                      <i class="fas fa-angle-left right"></i>
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="/pages/usability_report.html" class="nav-link" id="usability_report">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Usability Report</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="/pages/vpn_report.html" class="nav-link" id="vpn_report">
                        <i class="far fa-circle nav-icon"></i>
                        <p>VPN Report</p>
                      </a>
                    </li>   
                    <li class="nav-item">
                      <a href="/pages/viral_load.html" class="nav-link" id="viral_load_report">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Viral Load Report</p>
                      </a>
                    </li>
                  </ul>
                </li>                
                <li class="nav-item" id="settings">
                  <a href="#" class="nav-link">
                    <i class="nav-icon fas fa-cog"></i>
                    <p>
                      Settings
                      <i class="fas fa-angle-left right"></i>
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="#" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Profile</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="#" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Change Password</p>
                      </a>
                    </li>
                  </ul>
                </li>
             
              </ul>
            </nav>
            <!-- /.sidebar-menu -->
          </div>
          <!-- /.sidebar -->
        </aside>
        `
    }
}

class Footer extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <footer class="main-footer">
            <strong>Copyright &copy; ${new Date().toISOString().slice(0, 4)} <a href="">EMR MONITOR</a>.</strong>
            All rights reserved.
            <div class="float-right d-none d-sm-inline-block">
            <b>Version</b> 1.0.0
            </div>
        </footer>
        `
    }
}
customElements.define('app-footer',Footer)
customElements.define('app-bars',Bars)

var script = document.createElement('script');
script.src = '/config/config.js';
document.body.appendChild(script);
if(!sessionStorage.getItem('is_superuser')){
  document.getElementById('general').setAttribute("style","display:none")
}
document.getElementById(active_menu).setAttribute("class","nav-item menu-open")
document.getElementById(active_link).setAttribute("class","nav-link active")
function logout(){
  sessionStorage.setItem("Authorization","")
  sessionStorage.setItem("name","")
  sessionStorage.setItem("username","")
  sessionStorage.setItem("is_superuser","")
  window.location = "/pages/login.html"
}
