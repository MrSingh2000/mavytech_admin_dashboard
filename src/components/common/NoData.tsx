type Props = {
  text?: string;
};

function NoData({ text }: Props) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
      }}
    >
      <p style={{ fontSize: '2rem' }} className="text-gray-400">
        {text ?? 'No Data'}
      </p>
    </div>
  );
}

export default NoData;
