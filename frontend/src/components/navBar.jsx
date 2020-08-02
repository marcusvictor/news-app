import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import logo from "../assets/images/logo_infoglobo_new.gif";

const NavBar = () => {
  const user = getCurrentUser();

  const menuItems = [
    {
      id: "news",
      type: "nav-link",
      name: "Cadastro de Notícias",
      to: "/news",
      rolesAndGroups: [],
    },
  ];

  const checkItemPermission = (itemRolesAndGroups) => {
    const userRoles = user.groups.concat(user.roles);

    if (userRoles.find((r) => r === "admin")) return true;

    let roleFound = false;
    itemRolesAndGroups.forEach((ir) => {
      const role = userRoles.find((ur) => ur === ir);

      if (role) roleFound = true;
    });
    return roleFound;
  };

  const renderMenuItem = (id) => {
    const item = menuItems.find((i) => i.id === id);

    if (!item) throw new Error(`Navbar: "${id}" menu item not found`);

    if (
      item.rolesAndGroups.length !== 0 &&
      (!user || !checkItemPermission(item.rolesAndGroups))
    )
      return null;

    if (item.type === "dropdown-toggle")
      return (
        <NavLink
          className="nav-link dropdown-toggle"
          to={item.to}
          id={`navbarDropdownMenuLink${item.id}`}
          data-toggle="dropdown"
        >
          {item.name}
        </NavLink>
      );
    else if (item.type === "dropdown-item")
      return (
        <NavLink className="dropdown-item" to={item.to}>
          {item.name}
        </NavLink>
      );
    else if (item.type === "nav-link")
      return (
        <NavLink className="nav-link" to={item.to}>
          {item.name}
        </NavLink>
      );
    else throw new Error(`Navbar: "${item.type}" menu item type not found`);
  };

  const renderAuthItems = () => {
    return !user ? (
      <li key="login" className="nav-item">
        <NavLink className="nav-link" to="/login">
          Entrar
        </NavLink>
      </li>
    ) : (
      <li className="nav-item dropdown">
        <NavLink
          className="nav-link dropdown-toggle"
          to="/a"
          id="navbarDropdownMenuLinkLogout"
          data-toggle="dropdown"
        >
          {user.name}
        </NavLink>

        <div className="dropdown-menu">
          <NavLink className="dropdown-item" to="/logout">
            Sair
          </NavLink>
        </div>
      </li>
    );
  };

  return (
    <Fragment>
      <nav className={`navbar navbar-expand-lg navbar-dark`}>
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse " id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">{renderMenuItem("news")}</li>
          </ul>
        </div>
        <div className="d-flex flex-row-reverse bd-highlight">
          <ul className="navbar-nav">{renderAuthItems()}</ul>
        </div>
      </nav>
      <div className="transition" />
    </Fragment>
  );
};

export default NavBar;
