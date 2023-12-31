export interface NgxUpdateAppOptions {
  interval: number;
  dryRun?: boolean;
  onUpdateFactory: () => void;
}
