type LoadErrorProps = {
  message: string;
  onRetry: () => void;
};

export function LoadError({ message, onRetry }: LoadErrorProps) {
  return (
    <div className="load-error" role="alert">
      <p className="load-error__message">{message}</p>
      <button
        type="button"
        className="btn btn--primary btn--sm"
        onClick={onRetry}
      >
        Reintentar
      </button>
    </div>
  );
}
