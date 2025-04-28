
import { IndianRupee, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

const Navbar = () => {
  const isMobile = useIsMobile();

  const NavContent = () => (
    <NavigationMenuList className="flex items-center space-x-4">
      <NavigationMenuItem>
        <NavigationMenuLink className="text-foreground/60 hover:text-foreground transition-colors" href="#expenses">
          Expenses
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink className="text-foreground/60 hover:text-foreground transition-colors" href="#goals">
          Goals
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink className="text-foreground/60 hover:text-foreground transition-colors" href="#summary">
          Summary
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2">
          <IndianRupee className="h-6 w-6 text-rupeeflow-teal" />
          <span className="font-semibold">RupeeFlow</span>
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="mt-6">
                <NavContent />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <NavigationMenu className="ml-6">
            <NavContent />
          </NavigationMenu>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
