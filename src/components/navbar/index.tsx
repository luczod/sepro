import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";

interface IProps {
  user: string;
}

export default function NavBar({ user }: IProps) {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ height: "100%" }}
      >
        <div className="container-fluid">
          {/* <Link className="navbar-brand" href="/Dashboard">
            <img
              src="/assets/endereco.png"
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
          </Link> */}
          <div id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <h5>Bem-vindo(a)&nbsp;</h5>
              </li>
              <li className="nav-item">
                <h5>{user}&nbsp;</h5>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
