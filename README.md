new slice authSlice has slice with reducers  the initial state has tow props one users set to null everytime a user is connected  to the app the  t
the user state is set to null    the  state has to wait for firebase to   set a user  therefore comes initializing the second prop which is the informer 
here firebase to set user it would read from users session which is cached in the phone(IOs) would  be  the keychain  then after this  firebase would set a user that woild be true if has info already (email password) falls if not  
 in the reducers  state.intializing is set to false because it would  end the check  which is set true in initial.state 


 the  UseEffect in navigation  is  it sets up liveSuscription that  firebase call whenever the state.auth change (user session) then dispath to redux via  const dispatch, it connects firebase to redux to update  loggin logout state 
