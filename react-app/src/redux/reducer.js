
const request = require("request");

const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

export function login(email, password, eventEmitter) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(email, password, eventEmitter, error => {
      dispatch(setLoginPending(false));
      if (!error) {
        dispatch(setLoginSuccess(true));
      } else {
        dispatch(setLoginError(error));
      }
    });
  }
}

function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

function callLoginApi(email, password, eventEmitter, callback) {

  request.get("http://localhost:8083/checkConnection", (error, resp, body) => {

        setTimeout(() => {

          if (error || resp.statusCode !== 200 || !body) {
            return callback(new Error('Not Connected To Db'));          
          }

          if (email === 'petrut.patricia@gmail.com' && password === 'patricia') {
            eventEmitter.emit('loginSuccess');
            return callback(null);
          } else {
            return callback(new Error('Invalid credentials!'));
          }
        }, 1000);

      }); 

}

export default function reducer(state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null
}, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });

    default:
      return state;
  }
}