import { Navbar } from "@/components/Navbar";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";


const NavbarPage = () => {
  const usageCode = `import { Navbar } from "@/components/Navbar/Navbar";
import { Button } from "@/components/Button/Button";
  <Navbar>
    <h1>Logo</h1>
    <div className="flex gap-5">
      <a href="">Home</a>
      <a href="">About</a>
      <a href="">Customer</a>
    </div>
    <div>
      <Button hoverAnimation="none">Profile</Button>
    </div>
  </Navbar>`;

  const propsData = [
    {
      prop: "variant",
      type: '"primary" | "glass" | "light" | "dark"',
      default: '"light"',
      description: "The visual style variant of the navbar",
    },
    {
      prop: "size",
      type: '"sm" | "lg" | "xl" | "default"',
      default: '"default"',
      description: "The size of the navbar",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-4">
        <h1
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Navbar
        </h1>
        <p className="text-xl text-gray-600">
          A responsive navigation bar for displaying branding, navigation links,
          and an optional action button.
        </p>
      </div>
      <section className="space-y-4">
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--text-color)" }}
        >
          Usage
        </h2>
        <ComponentDemo code={usageCode}>
          <Navbar />
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData}/>
      </section>
    </div>
  );
};

export default NavbarPage;
