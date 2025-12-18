type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  idPrefix?: string;
};

const JsonLd = ({ data, idPrefix = "jsonld" }: JsonLdProps) => {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={`${idPrefix}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </>
  );
};

export default JsonLd;

