import { toast } from "@/components/ui/toast";
import { useGoogleOAuth } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function GoogleLoginComponent() {
  const router = useRouter();
  const { mutate: googleLogin } = useGoogleOAuth();

  const handleGoogleLoginSuccess = (credentialResponse: {
    credential?: string;
  }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.add({
        title: "Google login failed",
        description: "No credential received from Google.",
        type: "error",
      });
      return;
    }
    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Google login successful",
            description: "You have been logged in with Google successfully.",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          console.error("Google login failed:", err);
          toast.add({
            title: "Google login failed",
            description:
              "An error occurred while trying to log in with Google.",
            type: "error",
          });
        },
      },
    );
  };
  const handleGoogleLoginError = () => {
    toast.add({
      title: "Google login failed",
      description: "An error occurred while trying to log in with Google.",
      type: "error",
    });
  };
  return (
    <GoogleLogin
      theme="filled_blue"
      shape="pill"
      size="large"
      width="100%"
      onSuccess={handleGoogleLoginSuccess}
      onError={handleGoogleLoginError}
      text="continue_with"
    />
  );
}
