import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SignupInputState } from "@/schema/userSchema";
import { Loader2, Lock, Mail, User, Phone } from "lucide-react";
import { FormEvent, ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const signupSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(input);
  };

  const loading = false;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={signupSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl text-center">Flavour Fiesta</h1>
        </div>
        <div className="mb-2">
          <div className="relative">
            <Label>Full Name</Label>
            <Input
              className="pl-10 focus-visible:ring-1"
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
            <User className="absolute inset-y-7 left-2 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <div className="mb-2">
          <div className="relative">
            <Label>Email</Label>
            <Input
              className="pl-10 focus-visible:ring-1"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
            <Mail className="absolute inset-y-7 left-2 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <div className="mb-2">
          <div className="relative">
            <Label>Contact Number</Label>
            <Input
              className="pl-10 focus-visible:ring-1"
              type="tel"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
            />
            <Phone className="absolute inset-y-7 left-2 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <div className="mb-2">
          <div className="relative">
            <Label>Password</Label>
            <Input
              className="pl-10 focus-visible:ring-1"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
            <Lock className="absolute inset-y-7 left-2 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <div className="mb-10">
          {loading ? (
            <Button disabled type="submit" className="w-full bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">
              Signup
            </Button>
          )}
        </div>
        <Separator />
        <p className="mt-2 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
