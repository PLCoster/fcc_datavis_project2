// Function that adds the NavBar details when the DOM has loaded
export default function addNavBar() {
  document.querySelector('nav').innerHTML = `
    <div class="container-fluid">
      <a class="navbar-brand" href="."> Scatterplot Graph</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link active"
              href="https://plcoster.github.io/homepage/"
            >
              Home
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              FreeCodeCamp DataVis Projects
            </a>
            <ul
              class="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a
                  class="dropdown-item"
                  href="https://plcoster.github.io/fcc_datavis_project1/"
                >
                  Bar Chart
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="https://plcoster.github.io/fcc_datavis_project2/"
                >
                  Scatterplot Graph
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="https://plcoster.github.io/fcc_datavis_project3/"
                >
                  Heat Map
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="https://plcoster.github.io/fcc_datavis_project4/"
                >
                  Choropleth Map
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="https://plcoster.github.io/fcc_datavis_project5/"
                >
                  Treemap Diagram
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://plcoster.github.io/homepage/projects.html"
            >
              All Projects
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/PLCoster">
              <i class="bi bi-github"></i> Github
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://linkedin.com/in/plcoster">
              <i class="bi bi-linkedin"></i> LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>`;
}
