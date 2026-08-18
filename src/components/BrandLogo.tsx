import Image from "next/image";

type BrandLogoProps = {
  size?: number;
  showText?: boolean;
};

export function BrandLogo({ size = 34, showText = true }: BrandLogoProps) {
  return (
    <span
      className="brand"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.38,
      }}
    >
      <Image
        src="/app-icon.png"
        alt={showText ? "" : "MyAgro"}
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.22,
          flexShrink: 0,
        }}
      />
      {showText ? (
        <span
          style={{
            fontWeight: 800,
            fontSize: size * 0.78,
            letterSpacing: "-0.045em",
            lineHeight: 1,
            color: "var(--ink)",
          }}
        >
          MyAgro
        </span>
      ) : null}
    </span>
  );
}
