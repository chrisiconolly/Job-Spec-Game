/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface IPosition {
  x: number;
  y: number;
}

interface ILevelChart {
  title: string;
  data: Array<{
    label: string;
    value: string;
  }>;
}

interface ILevel {
  role: string;
  introText: string;
  aboutUsText: string;
  extraText1: string;
  verticalChart: ILevelChart;
  horizontalChart: ILevelChart;
  distance: Array<{
    type: string;
    left: string;
  }>;
}
