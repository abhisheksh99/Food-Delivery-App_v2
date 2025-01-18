import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RestaurantFormSchema,
  restaurantFromSchema,
} from "@/schema/restaurantSchema";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });
  const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({});

  const loading = false;
  const restaurant = false;

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = restaurantFromSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RestaurantFormSchema>);
      return;
    }

    console.log("Submitted Data:", input);
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
      <form onSubmit={submitHandler}>
        <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
          {/* Restaurant Name */}
          <div>
            <Label>Restaurant Name</Label>
            <Input
              type="text"
              name="restaurantName"
              value={input.restaurantName}
              onChange={changeEventHandler}
              placeholder="Enter your restaurant name"
            />
            {errors?.restaurantName && (
              <span className="text-xs text-red-600 font-medium">
                {errors.restaurantName}
              </span>
            )}
          </div>

          {/* City */}
          <div>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
              placeholder="Enter your city name"
            />
            {errors?.city && (
              <span className="text-xs text-red-600 font-medium">
                {errors.city}
              </span>
            )}
          </div>

          {/* Country */}
          <div>
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
              placeholder="Enter your country name"
            />
            {errors?.country && (
              <span className="text-xs text-red-600 font-medium">
                {errors.country}
              </span>
            )}
          </div>

          {/* Delivery Time */}
          <div>
            <Label>Estimated Delivery Time (in Min)</Label>
            <Input
              type="number"
              name="deliveryTime"
              value={input.deliveryTime}
              onChange={changeEventHandler}
              placeholder="Enter estimated delivery time"
            />
            {errors?.deliveryTime && (
              <span className="text-xs text-red-600 font-medium">
                {errors.deliveryTime}
              </span>
            )}
          </div>

          {/* Cuisines */}
          <div>
            <Label>Cuisines</Label>
            <Input
              type="text"
              name="cuisines"
              value={input.cuisines.join(", ")}
              onChange={(e) =>
                setInput({
                  ...input,
                  cuisines: e.target.value.split(",").map((c) => c.trim()),
                })
              }
              placeholder="Enter cuisines (comma-separated)"
            />
            {errors?.cuisines && (
              <span className="text-xs text-red-600 font-medium">
                {errors.cuisines}
              </span>
            )}
          </div>

          {/* Upload Image */}
          <div>
            <Label>Upload Restaurant Banner</Label>
            <Input
              onChange={(e) =>
                setInput({
                  ...input,
                  imageFile: e.target.files?.[0] || undefined,
                })
              }
              type="file"
              accept="image/*"
              name="imageFile"
            />
            {errors?.imageFile && (
              <span className="text-xs text-red-600 font-medium">
                {errors.imageFile}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="my-5 w-fit">
            {loading ? (
              <Button disabled className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="bg-orange hover:bg-hoverOrange">
                {restaurant ? "Update Restaurant" : "Add Your Restaurant"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Restaurant;
