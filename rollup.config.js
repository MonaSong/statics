
import babel  from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: [{
                file: './dist/SendAnalysisData.iife.js',
                format: 'iife',
                name: 'SendAnalysisData'
            },{
                file: './dist/SendAnalysisData.amd.js',
                format: 'amd',
                name: 'SendAnalysisData'
            },{
                file: './dist/SendAnalysisData.cjs.js',
                format: 'cjs',
                name: 'SendAnalysisData'
            },{
                file: './dist/SendAnalysisData.es.js',
                format: 'es',
                name: 'SendAnalysisData'
            },{
                file: './dist/SendAnalysisData.umd.js',
                format: 'umd',
                name: 'SendAnalysisData'
            }],
    plugins: [
        babel()
    ]
};
