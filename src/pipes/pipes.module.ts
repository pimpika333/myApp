import { NgModule } from '@angular/core';
import { MomentPipe } from './moment/moment';
@NgModule({
	declarations: [MomentPipe,
    MomentPipe],
	imports: [],
	exports: [MomentPipe,
    MomentPipe]
})
export class PipesModule {}
