import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 
 // Inject the Router service
 const router = new Router();

/* Your authentication check */
const isLoggedIn =localStorage.getItem('token') ;
//  isLoggedIn !== null ? true : false;
  if (isLoggedIn) {
    // User is authenticated, allow access
    return true;
  } else {
    // User is not authenticated, deny access
    window.alert('Access Not  Allowed!');

    // Navigate to the login page and store the current URL in the state
    router.navigate(['/login'], { state: { returnUrl: state.url } });
    return false;
  }
  
};


  

