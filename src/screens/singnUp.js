import { useState } from "react";
import { vieView,Text,TextInput,Pressable,ActivityIndicator,KeyboardAvoidingView,ScrollView,Platform} from "react-native";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../../firebase/configue';
import { setAuth } from "../../redux/slices/authSlice";
import { useForm, Controller } from "react-hook-form";


const FIREBASE_ERRORS = {
  "auth/email-already-in-use": "An account with this email already exists. Log in instead.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/weak-password": "Use at least 6 characters for your password.",
  "auth/network-request-failed": "No connection. Check your internet and try again.",
};

function Field({ label, error, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <View className="mb-4">
      <Text className="mb-1.5 text-sm font-semibold text-[#14213D]">{label}</Text>
      <TextInput
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor="#8A94A6"
        className={`rounded-xl border-2 bg-[#F2F4F8] px-4 py-3.5 text-base text-[#14213D] ${
          error ? "border-[#D7263D]" : focused ? "border-[#1D3FA8]" : "border-transparent"
        }`}
      />
      {error ? <Text className="mt-1 text-sm text-[#D7263D]">{error}</Text> : null}
    </View>
  );
}


export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const API_URL= process.env.EXPO_BASE_URL

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", email: "", password: "", confirm: "" },
  });

  const onSubmit = async ({ name, email, password }) => {
    setFormError("");
    try {
      // 1. Create the Firebase account
      const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(user, { displayName: name.trim() });

      // 2. Create the matching user in MongoDB
      const token = await user.getIdToken();
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name.trim(), email: user.email }),
      });
      if (!res.ok) throw new Error("profile-create-failed");
      const profile = await res.json();

      // 3. Save to Redux
      dispatch(setAuth({ uid: user.uid, email: user.email, ...profile }));
    } catch (err) {
      console.log(err.code ?? err.message);
      setFormError(
        FIREBASE_ERRORS[err.code] ??
          (err.message === "profile-create-failed"
            ? "Your account was created, but your profile couldn't be saved. Try logging in."
            : "Sign up failed. Try again.")
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center px-6 py-12"
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-1 h-1.5 w-12 rounded-full bg-[#FF6B1A]" />
        <Text className="mt-4 text-4xl font-black tracking-tight text-[#14213D]">
          Create your account
        </Text>
        <Text className="mb-8 mt-2 text-base text-[#5B6578]">
          Share your photos and videos with your team.
        </Text>

        <Controller
          control={control}
          name="name"
          rules={{ validate: (v) => v.trim().length > 0 || "Enter your name." }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Field
              label="Name"
              placeholder="Alex Morgan"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
              autoComplete="name"
              textContentType="name"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Enter your email.",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address." },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Field
              label="Email"
              placeholder="you@example.com"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: "Enter a password.",
            minLength: { value: 6, message: "Use at least 6 characters." },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Field
              label="Password"
              placeholder="At least 6 characters"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              textContentType="newPassword"
            />
          )}
        />

        <Controller
          control={control}
          name="confirm"
          rules={{
            validate: (v) => v === getValues("password") || "Passwords don't match.",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Field
              label="Confirm password"
              placeholder="Type it again"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirm?.message}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              textContentType="newPassword"
            />
          )}
        />

        <Pressable onPress={() => setShowPassword((s) => !s)} className="mb-6 self-start py-1">
          <Text className="text-sm font-semibold text-[#1D3FA8]">
            {showPassword ? "Hide passwords" : "Show passwords"}
          </Text>
        </Pressable>

        {formError ? (
          <View className="mb-4 rounded-xl bg-[#FDECEE] px-4 py-3">
            <Text className="text-sm text-[#D7263D]">{formError}</Text>
          </View>
        ) : null}

        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className={`items-center rounded-xl py-4 ${
            isSubmitting ? "bg-[#1D3FA8]/60" : "bg-[#1D3FA8] active:bg-[#16318A]"
          }`}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-base font-bold text-white">Create account</Text>
          )}
        </Pressable>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-[#5B6578]">Already have an account? </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text className="font-bold text-[#1D3FA8]">Log in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}



