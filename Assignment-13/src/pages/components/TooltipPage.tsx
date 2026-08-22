import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Button } from "@/components/Button/Button";
import { Tooltip } from "@/components/Tooltip/Tooltip";

const TooltipPage = () => {
  const positionsUsageCode = `import { Button } from "@/components/Button/Button";
import { Tooltip } from "@/components/Tooltip/Tooltip";

<Tooltip content="Tooltip on top" position="top">
  <Button variant="primary" size="sm">Top</Button>
</Tooltip>

<Tooltip content="Tooltip on bottom" position="bottom">
  <Button variant="secondary" size="sm">Bottom</Button>
</Tooltip>

<Tooltip content="Tooltip on left" position="left">
  <Button variant="outline" size="sm">Left</Button>
</Tooltip>

<Tooltip content="Tooltip on right" position="right">
  <Button variant="dark" size="sm">Right</Button>
</Tooltip>`;

  const variantsUsageCode = `<Tooltip content="Dark variant" variant="dark">
  <Button variant="dark" size="sm">Dark</Button>
</Tooltip>

<Tooltip content="Light variant" variant="light">
  <Button variant="outline" size="sm">Light</Button>
</Tooltip>

<Tooltip content="Primary variant" variant="primary">
  <Button variant="primary" size="sm">Primary</Button>
</Tooltip>

<Tooltip content="Outline style variant" variant="outline">
  <Button variant="ghost" size="sm">Outline</Button>
</Tooltip>`;

  const advancedUsageCode = `<Tooltip content="Appears after 500ms delay" delay={500}>
  <Button variant="primary" size="sm">500ms Delay</Button>
</Tooltip>

<Tooltip content="No arrow tooltip" showArrow={false}>
  <Button variant="secondary" size="sm">No Arrow</Button>
</Tooltip>`;

  const propsData = [
    {
      prop: "content",
      type: "ReactNode",
      default: "-",
      description: "Content rendered inside the tooltip box",
    },
    {
      prop: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Placement position of tooltip relative to target element",
    },
    {
      prop: "variant",
      type: '"dark" | "light" | "primary" | "outline"',
      default: '"dark"',
      description: "Visual style variant of the tooltip",
    },
    {
      prop: "delay",
      type: "number",
      default: "0",
      description: "Delay before showing tooltip (in milliseconds)",
    },
    {
      prop: "showArrow",
      type: "boolean",
      default: "true",
      description: "Toggles visibility of indicator arrow",
    },
    {
      prop: "isVisible",
      type: "boolean",
      default: "undefined",
      description: "Optional state to control visibility explicitly",
    },
    {
      prop: "children",
      type: "ReactNode",
      default: "-",
      description: "Target trigger element that activates tooltip",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-4">
        <h1
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Tooltip
        </h1>
        <p className="text-xl text-gray-600">
          A popup that displays information related to an element when hovered or focused.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-color)" }}>
          Positions
        </h2>
        <ComponentDemo code={positionsUsageCode}>
          <div className="flex gap-6 flex-wrap items-center justify-center py-4">
            <Tooltip content="Tooltip on top" position="top">
              <Button variant="primary" size="sm">Top</Button>
            </Tooltip>

            <Tooltip content="Tooltip on bottom" position="bottom">
              <Button variant="secondary" size="sm">Bottom</Button>
            </Tooltip>

            <Tooltip content="Tooltip on left" position="left">
              <Button variant="outline" size="sm">Left</Button>
            </Tooltip>

            <Tooltip content="Tooltip on right" position="right">
              <Button variant="dark" size="sm">Right</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-color)" }}>
          Variants
        </h2>
        <ComponentDemo code={variantsUsageCode}>
          <div className="flex gap-6 flex-wrap items-center justify-center py-4">
            <Tooltip content="Dark variant" variant="dark">
              <Button variant="dark" size="sm">Dark</Button>
            </Tooltip>

            <Tooltip content="Light variant" variant="light">
              <Button variant="outline" size="sm">Light</Button>
            </Tooltip>

            <Tooltip content="Primary variant" variant="primary">
              <Button variant="primary" size="sm">Primary</Button>
            </Tooltip>

            <Tooltip content="Outline style variant" variant="outline">
              <Button variant="ghost" size="sm">Outline</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-color)" }}>
          Delays & Arrow Options
        </h2>
        <ComponentDemo code={advancedUsageCode}>
          <div className="flex gap-6 flex-wrap items-center justify-center py-4">
            <Tooltip content="Appears after 500ms delay" delay={500}>
              <Button variant="primary" size="sm">500ms Delay</Button>
            </Tooltip>

            <Tooltip content="No arrow tooltip" showArrow={false}>
              <Button variant="secondary" size="sm">No Arrow</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default TooltipPage;
