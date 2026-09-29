import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { 
  Card, 
  TextInput, 
  Select, 
  Badge, 
  Pagination, 
  Typography 
} from '../index';
import { colors } from '../tokens/colors.stylex';
import { spacing } from '../tokens/spacing.stylex';
import { shape } from '../tokens/shape.stylex';

const styles = stylex.create({
  container: {
    padding: spacing.space6,
    backgroundColor: colors.backgroundBase,
  },
  title: {
    marginBottom: spacing.space4,
  },
  toolbar: {
    display: 'flex',
    gap: spacing.space4,
    marginBottom: spacing.space4,
    alignItems: 'center',
  },
  search: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.backgroundRaised,
    borderRadius: shape.radiusMd,
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: spacing.space4,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.strokeWeak,
    color: colors.textWeak,
  },
  td: {
    padding: spacing.space4,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.strokeWeak,
  },
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: spacing.space4,
  },
});

interface UserItem {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
}

const mockUsers: UserItem[] = [
  { id: '1', name: 'Alice Smith', role: 'Admin', status: 'active' },
  { id: '2', name: 'Bob Jones', role: 'Editor', status: 'pending' },
  { id: '3', name: 'Charlie Brown', role: 'Viewer', status: 'inactive' },
];

export function DataTableRecipe() {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);

  return (
    <div {...stylex.props(styles.container)}>
      <Typography variant="h2" style={styles.title}>
        User Management
      </Typography>

      <div {...stylex.props(styles.toolbar)}>
        <TextInput style={styles.search}>
          <TextInput.Field 
            placeholder="Search users..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </TextInput>

        <Select>
          <Select.Trigger placeholder="Filter by status" />
          <Select.Content>
            <Select.Item value="all">All Statuses</Select.Item>
            <Select.Item value="active">Active</Select.Item>
            <Select.Item value="pending">Pending</Select.Item>
          </Select.Content>
        </Select>
      </div>

      <Card style={styles.card}>
        <table {...stylex.props(styles.table)}>
          <thead>
            <tr>
              <th {...stylex.props(styles.th)}>Name</th>
              <th {...stylex.props(styles.th)}>Role</th>
              <th {...stylex.props(styles.th)}>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td {...stylex.props(styles.td)}>
                  <Typography variant="bodyMd">{user.name}</Typography>
                </td>
                <td {...stylex.props(styles.td)}>
                  <Typography variant="captionMd" color="weak">{user.role}</Typography>
                </td>
                <td {...stylex.props(styles.td)}>
                  <Badge tone={user.status === 'active' ? 'success' : user.status === 'pending' ? 'warning' : 'neutral'}>
                    <Badge.Label>{user.status.toUpperCase()}</Badge.Label>
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div {...stylex.props(styles.paginationWrapper)}>
          <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
        </div>
      </Card>
    </div>
  );
}
