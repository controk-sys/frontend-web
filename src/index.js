import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import App from './App' // eslint-disable-line no-unused-vars
import './index.css'
import '../node_modules/material-design-lite/dist/material.min.css'
import 'material-design-lite'

ReactDOM.render(
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">Controk</span>
      </div>
    </header>
    <div className="mdl-layout__drawer">
      <nav className="mdl-navigation">
        <a className="mdl-navigation__link" href="">Funcionário</a>
        <a className="mdl-navigation__link" href="">Fornecedor</a>
        <a className="mdl-navigation__link" href="">Cliente</a>
        <a className="mdl-navigation__link" href="">Remessa</a>
        <a className="mdl-navigation__link" href="">Produto</a>
        <a className="mdl-navigation__link" href="">Estoque</a>
      </nav>
    </div>
    <main className="mdl-layout__content">
      <div className="page-content">
        <App />
      </div>
    </main>
  </div>,
  document.getElementById('root') // eslint-disable-line no-undef
)
