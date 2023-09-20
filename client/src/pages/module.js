import React from "react";
import Layout from "../components/layout";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import ModuleDetail from "../components/module-detail";
import QueryResult from "../components/query-result";

const GET_MODULE = gql`
	query getModuleAndParentTrack($trackId: ID!, $moduleId: ID!) {
		module(id: $moduleId) {
			id
			title
			length
			content
			videoUrl
		}
		track(id: $trackId) {
			id
			title
			modules {
				id
				title
				length
				content
				videoUrl
			}
		}
	}
`;

const Module = () => {
	const { trackId, moduleId } = useParams();

	const { loading, error, data } = useQuery(GET_MODULE, {
		variables: { trackId, moduleId },
	});

	return (
		<Layout fullWidth>
			<QueryResult loading={loading} error={error} data={data}>
				<ModuleDetail track={data?.track} module={data?.module} />
			</QueryResult>
		</Layout>
	);
};

export default Module;
