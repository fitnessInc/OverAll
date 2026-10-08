new slice authSlice has slice with reducers  the initial state has tow props one users set to null everytime a user is connected  to the app the  t
the user state is set to null    the  state has to wait for firebase to   set a user  therefore comes initializing the second prop which is the informer 
here firebase to set user it would read from users session which is cached in the phone(IOs) would  be  the keychain  then after this  firebase would set a user that woild be true if has info already (email password) falls if not  
 in the reducers  state.intializing is set to false because it would  end the check  which is set true in initial.state 


 the  UseEffect in navigation  is  it sets up liveSuscription that  firebase call whenever the state.auth change (user session) then dispath to redux via  const dispatch, it connects firebase to redux to update  loggin logout state 

 the signUp screen use react-Hook-form 
  in the pattern of the  my firebase auth  firebase answer who is the person and mangoDb fetch the profile 
  after user logged in then  db would recognise and check the uid in doc and populate userProfile via populate('profile_id') 
  profile is referenced in userSchema 

  the  shema of profile's users and users s'logged in viewing someone else profile 

  Step 1, getting the user ID, happens inside each route, before findGallery is called. /me/gallery gets it from the Firebase token (User.findOne({ firebaseUid }) → user._id), and /:userId/gallery gets it from the URL (req.params.userId).

Step 2 is findGallery, which receives that ID, finds the Profile with it, and populates the gallery's photos and videos.

Step 3 is formatGallery, which takes that raw populated array and cleans it into a simple array where each item has a type ('photo' or 'video') plus the fields the app needs.

And yes on the routes: /me/gallery is the logged-in user viewing their own gallery, and /:userId/gallery is the logged-in user viewing someone else's gallery. Both require being logged in (verifyFirebaseToken), but only the second needs an ID in the URL, because for your own gallery the token already says who you are.
  
