import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import { z } from "zod";
import { FieldInfo } from "@/components/FormField";
import { SocialLogins } from "@/components/SocialLogins";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const Route = createFileRoute("/auth/login")({
  component: SignupPage,
});

function SignupPage() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email({
        email: value.email,
        password: value.password,
        rememberMe: true,
      });
    },
    validators: { onChange: signupSchema },
  });

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a className="flex items-center gap-2 self-center font-medium" href="#">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back!</CardTitle>
              <CardDescription>
                Login with your Apple or Google account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <SocialLogins />
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <form
                  className="grid gap-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                  }}
                >
                  <form.Field name="email">
                    {(field) => (
                      <div className="grid gap-2">
                        <Label htmlFor={field.name}>Email</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="m@example.com"
                          type="text"
                          value={field.state.value}
                        />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="password">
                    {(field) => (
                      <div className="grid gap-3">
                        <Label htmlFor={field.name}>Password</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="********"
                          type="password"
                          value={field.state.value}
                        />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  </form.Field>
                  <Button className="w-full" type="submit">
                    Log in
                  </Button>
                </form>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link
                    className="underline underline-offset-4"
                    to="/auth/signup"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
