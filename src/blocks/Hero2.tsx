import { Badge } from "@/src/components/ui/badge";
import { Button } from "../components/ui/button";
import { ArrowDownRight } from "lucide-react";

const Hero2: React.FC = () => {
  return (
    <section className="h-screen">
      <div className="container relative h-full">
          <div className="relative pt-24 flex flex-col items-center text-center">
            {/* <Badge variant="outline">
              New Release
              <ArrowDownRight className="ml-2 size-4" />
            </Badge> */}
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Welcome to Our Website
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
              doloremque mollitia fugiat omnis! Porro facilis quo animi
              consequatur. Explicabo.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
              <Button className="w-full sm:w-auto">Primary Button</Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Secondary Button
                <ArrowDownRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
          <img
            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
            alt="placeholder hero"
            className="absolute top-0 z-[-1] w-full rounded-md object-cover bg-primary-foreground"
            width={768}
            height={400}
          />
        </div>
    </section>
  );
};

export default Hero2;
