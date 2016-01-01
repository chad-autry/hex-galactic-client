var ngCore = require('angular2/core'),
    ngCommonDirectives = require('angular2/src/common/directives'),
    ngRouter = require('angular2/router'),
    linkActiveClass = require('../../common/LinkActiveClassDirective'),
    jwt = require('angular2-jwt'),
    Auth = require('ng2-ui-auth');

module.exports = ngCore
    .Component({
        selector: 'app-navbar',
        template: `
    <div class="container">
      <div class="navbar navbar-default">
        <!--Note: I don't care about giving a different mouse icon for collapsing, since it is mainly for mobile -->
        <div class="navbar-header" (click)="menuCollapsed = !menuCollapsed">
          <div class="navbar-toggle">
            <span class="sr-only">Toggle navigation</span>
            <i [ngClass]="{'fa-chevron-right': menuCollapsed, 'fa-chevron-down': !menuCollapsed}" class='fa'></i>
          </div>
          <div class="navbar-brand">
            Hexagonal Space
          </div>
        </div>
        <div class="navbar-collapse" [ngClass]="{'hidden-xs': menuCollapsed}">
          <ul class="nav navbar-nav">
            <li linkActiveClass="active">
              <a [routerLink]="['Scenarios']">
                <i class="fa fa-list"></i>
                Scenarios
              </a>
            </li>
            <li>
              <a href="https://github.com/chad-autry/hexagonal-space-client/issues">
                <i class="fa fa-comments"></i>
                Support
              </a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li linkActiveClass="active" *ngIf="auth.isAuthenticated()">
              <a [routerLink]="['UserManagement']">
                <i class="fa fa-user"></i>
                {{jwtHelper.decodeToken(auth.getToken()).name}}
              </a>
            </li>
            <li linkActiveClass="active" *ngIf="!auth.isAuthenticated()">
              <a [routerLink]="['Login']">
                <i class="fa fa-sign-in"></i>
                Logon
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>`,
     directives: [ngRouter.ROUTER_DIRECTIVES, linkActiveClass, ngCommonDirectives.NgIf]
     })
    .Class({
        constructor: [Auth.Auth, jwt.JwtHelper, function(auth, jwtHelper) {
            this.auth = auth;
            this.jwtHelper = jwtHelper;
        }]
    });