### Demo dash showing data/ml-features from Turboprop fd001 dataset

Dash at https://ganesh47.github.io/turboprop-fd001-dash/


The dash shows how Remaining Useful Life of a turbofan FD001 using NASA dataset, showcasing how actual and predicted (via a simple linear ML-FE model) can be displayed using high density datasets, duckdb. Usage of parquet compressed ensured high density data can be sent compressed to clients, ensuring client-side computations, data-decompresion, data-querying and rendering. This showcases how advanced visualisations can be purely done at client-side w/o any server side compute.
