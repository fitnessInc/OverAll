import { useState } from "react";
import { vieView,Text,TextInput,Pressable,ActivityIndicator,KeyboardAvoidingView,ScrollView,Platform} from "react-native";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../../firebase/configue'




