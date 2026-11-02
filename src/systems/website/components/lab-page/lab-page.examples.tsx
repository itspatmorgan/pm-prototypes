import { LabPage, LabSection } from './lab-page';
export const Default = () => (
  <LabPage title="Experiment" description="A one-line description from the Lab entry." intro={<p>Words that introduce the experiment go here, as prose.</p>}>
    <LabSection title="A section"><div className="flex min-h-36 items-center justify-center rounded-lg border border-border bg-card text-sm text-muted-foreground">The experiment</div></LabSection>
  </LabPage>
);
