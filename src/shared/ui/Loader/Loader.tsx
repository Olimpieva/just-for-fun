import cn from "classnames";
import css from "./Loader.module.scss";

type Props = {
  label: string;
  className?: string;
};

const Loader = ({ label, className }: Props) => (
  <div className={cn(css.loader, className)} role="status" aria-label={label}>
    <span className={css.dots} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  </div>
);

export default Loader;
